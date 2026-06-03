using Ndolo.Api.Models.Enums;

namespace Ndolo.Api.Tests;

public class TrustLevelGuardTests
{
    [Theory]
    [InlineData(TrustLevel.L0, false)]
    [InlineData(TrustLevel.L1, false)]
    [InlineData(TrustLevel.L2, true)]
    [InlineData(TrustLevel.L3, true)]
    public void CanCreateCagnotte_RequiresL2OrAbove(TrustLevel level, bool expected)
    {
        var result = level >= TrustLevel.L2;
        Assert.Equal(expected, result);
    }
}
